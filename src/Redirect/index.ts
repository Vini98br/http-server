/**
 * @adonisjs/http-server
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/// <reference path="../../adonis-typings/index.ts" />

import qs from 'qs'
import { parse } from 'url'
import encodeurl from 'encodeurl'
import { IncomingMessage } from 'http'
import { RouterContract, MakeUrlOptions } from '@ioc:Adonis/Core/Route'
import { RedirectContract, ResponseContract } from '@ioc:Adonis/Core/Response'

import { RouterException } from '../Exceptions/RouterException'

/**
 * Exposes the API to construct redirect routes
 */
export class Redirect implements RedirectContract {
	/**
	 * A boolean to forward the existing query string
	 */
	private forwardQueryString = false

	/**
	 * The status code for the redirect
	 */
	private statusCode = 302

	/**
	 * A custom query string to forward
	 */
	private queryString: { [key: string]: any } = {}

	constructor(
		private request: IncomingMessage,
		private response: ResponseContract,
		private router: RouterContract
	) {}

	/**
	 * Set a custom status code.
	 */
	public status(statusCode: number): this {
		this.statusCode = statusCode
		return this
	}

	/**
	 * Clearing query string values added using the
	 * "withQs" method
	 */
	public clearQs(): this {
		this.forwardQueryString = false
		this.queryString = {}
		return this
	}

	/**
	 * Define query string for the redirect. Not passing
	 * any value will forward the current request query
	 * string.
	 */
	public withQs(): this
	public withQs(values: { [key: string]: any }): this
	public withQs(name: string, value: any): this
	public withQs(name?: { [key: string]: any } | string, value?: any): this {
		if (typeof name === 'undefined') {
			this.forwardQueryString = true
			return this
		}

		if (typeof name === 'string') {
			this.queryString[name] = value
			return this
		}

		Object.assign(this.queryString, name)
		return this
	}

	/**
	 * Redirect to the previous path.
	 */
	public back() {
		let url = this.request.headers['referer'] || this.request.headers['referrer'] || '/'
		url = Array.isArray(url) ? url[0] : url

		/**
		 * Remove query string from the referrer
		 */
		return this.toPath(url.split('?')[0])
	}

	/**
	 * Redirect the request using a route identifier.
	 */
	public toRoute(routeIdentifier: string, urlOptions?: MakeUrlOptions, domain?: string) {
		const url = this.router.makeUrl(routeIdentifier, urlOptions, domain)
		if (!url) {
			throw RouterException.cannotLookupRoute(routeIdentifier)
		}

		return this.toPath(url)
	}

	/**
	 * Redirect the request using a path.
	 */
	public toPath(url: string) {
		let query: any = {}

		/**
		 * Extract the current query string
		 */
		if (this.forwardQueryString) {
			query = qs.parse(parse(this.request.url!, false).query || '')
		}

		/**
		 * Assign custom query string
		 */
		Object.assign(query, this.queryString)

		/**
		 * Convert string
		 */
		const stringified = qs.stringify(query)

		url = stringified ? `${url}?${stringified}` : url
		this.response.location(encodeurl(url))
		this.response.safeStatus(this.statusCode)
		this.response.type('text/plain; charset=utf-8')
		this.response.send(`Redirecting to ${url}`)
	}
}
