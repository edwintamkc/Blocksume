import puppeteer from 'puppeteer'
import hbs from 'handlebars'
import path from 'path'
import fs from 'fs-extra'
import db from '../config/database.js'

const generateDigitalResume = async (req, res) => {
    console.log('generating resume')
    let data = req.body

    let result = await getUserProfile(data.userId)
    data.userProfile = result[0]

    console.log(data)

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        console.log(process.cwd())
        const filePath = path.join(process.cwd(), '/lib/template/resumeTemplate.hbs')
        const templateHtml = await fs.readFile(filePath, 'utf-8')

        const content = await hbs.compile(templateHtml)(data)

        await page.setContent(content)
        await page.pdf({
            path: path.join(process.cwd(), '/lib/output/resume.pdf'),
            format: 'A4'
        })

        await browser.close()

        console.log('finish resume generation')
    } catch (e) {
        console.log(e)
    }
}

const getUserProfile = (userId) => {
    let sql = `select user_full_name, email, ethereum_address from profile_receiver p where user_id = ${userId}`
    return db.query(sql)
}

export default { generateDigitalResume }