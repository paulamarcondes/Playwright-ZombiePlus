const { expect } = require('@playwright/test')
const fs = require('fs')
const path = require('path')

export class Api {
    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post(`${process.env.BASE_API}/sessions`, {
            data: {
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            }
        })
        expect(response.status()).toBe(200)
        const body = JSON.parse(await response.text())
        this.token = body.token
    }

    async getCompanyIdByName(companyName) {
        const response = await this.request.get(`${process.env.BASE_API}/companies`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            params: {
                name: companyName
            }
        })
        expect(response.ok()).toBeTruthy()
        const body = JSON.parse(await response.text())
        return body.data[0].id
    }

    async postMovie(movie) {
        const companyId = await this.getCompanyIdByName(movie.company)
        const response = await this.request.post(`${process.env.BASE_API}/movies`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured,
                cover: fs.createReadStream(path.resolve('tests/support/fixtures' + movie.cover))
            }
        })
        expect(response.ok()).toBeTruthy()
    }

    async postSeries(series) {
        const companyId = await this.getCompanyIdByName(series.company)
        const response = await this.request.post(`${process.env.BASE_API}/tvshows`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: series.title,
                overview: series.overview,
                company_id: companyId,
                release_year: series.release_year,
                seasons: series.seasons,
                featured: series.featured,
                cover: fs.createReadStream(path.resolve('tests/support/fixtures' + series.cover))
            }
        })
        expect(response.ok()).toBeTruthy()
    }

}
