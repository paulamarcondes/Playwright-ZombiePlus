import { APIRequestContext, expect } from '@playwright/test'
import fs from 'fs'
import { env } from '../env'
import { fixturePath } from '../paths'
import { Movie, Series } from '../types'

export class Api {
    readonly request: APIRequestContext
    token?: string

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async setToken() {
        const response = await this.request.post(`${env.baseApi}/sessions`, {
            data: {
                email: env.adminEmail,
                password: env.adminPassword
            }
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        this.token = body.token
    }

    async getCompanyIdByName(companyName: string) {
        const response = await this.request.get(`${env.baseApi}/companies`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            params: {
                name: companyName
            }
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        expect(body.data.length, `Company not found: "${companyName}"`).toBeGreaterThan(0)
        return body.data[0].id
    }

    async postLead(name: string, email: string) {
        const response = await this.request.post(`${env.baseApi}/leads`, {
            data: {
                email,
                name
            }
        })
        expect(response.ok()).toBeTruthy()
    }

    async postMovie(movie: Movie) {
        const companyId = await this.getCompanyIdByName(movie.company)
        const response = await this.request.post(`${env.baseApi}/movies`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured,
                cover: fs.createReadStream(fixturePath(movie.cover))
            }
        })
        expect(response.ok()).toBeTruthy()
    }

    async postSeries(series: Series) {
        const companyId = await this.getCompanyIdByName(series.company)
        const response = await this.request.post(`${env.baseApi}/tvshows`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            multipart: {
                title: series.title,
                overview: series.overview,
                company_id: companyId,
                release_year: series.release_year,
                seasons: series.seasons,
                featured: series.featured,
                cover: fs.createReadStream(fixturePath(series.cover))
            }
        })
        expect(response.ok()).toBeTruthy()
    }
}
