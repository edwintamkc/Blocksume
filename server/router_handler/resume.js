import puppeteer from 'puppeteer'
import hbs from 'handlebars'
import path from 'path'
import fs from 'fs-extra'

const generateDigitalResume = async (req, res) => {
    console.log('generating resume')
    let content = req.body
    console.log(content)
    try {
        // const browser = await puppeteer.launch()
        // const page = await browser.newPage()

        // console.log(process.cwd())
        // const filePath = path.join(process.cwd(), '/lib/template/resumeTemplate.hbs')
        // const templateHtml = await fs.readFile(filePath, 'utf-8')

        // const content = await hbs.compile(templateHtml)({
        //     "id": {
        //         "name": {
        //             "first": "Layla",
        //             "last": "Clark"
        //         },
        //         "animal": "Dog",
        //         "color": "Yellow",
        //         "breed": "Carolina Dog"
        //     },
        //     "shots": [
        //         {
        //             "type": "Heartworm",
        //             "date": "2015-02-02"
        //         },
        //         {
        //             "type": "test2",
        //             "date": "20512131233-02-02"
        //         },
        //         {
        //             "type": "test3",
        //             "date": "201123-02-02"
        //         }
        //     ]
        // })

        // await page.setContent(content)
        // await page.pdf({
        //     path: path.join(process.cwd(), '/lib/output/resume.pdf'),
        //     format: 'A4'
        // })

        // await browser.close()

        // console.log('finish resume generation')
    } catch (e) {
        console.log(e)
    }
}

export default { generateDigitalResume }