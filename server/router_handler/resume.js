import puppeteer from 'puppeteer'
import hbs from 'handlebars'
import path from 'path'
import fs from 'fs-extra'
import db from '../config/database.js'

const generateDigitalResume = async (req, res) => {
    console.log('generating resume')
    let data = req.body

    // get user profile and add it to data
    let result = await getReceiverProfile(data.userId)
    data.userProfile = result[0]

    // get verification link for each cert and add it to data
    for(let i = 0; i < data.certificateList.length; i++){
        let link = getVerificationLink(data.certificateList[i].certificate_id)
        data.certificateList[i].verification_link = link
    }    

    console.log(data)

    // start generating resume pdf
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

    // return pdf to client
    const filePath = path.join(process.cwd(), '/lib/output/resume.pdf')
    let fileStream = fs.createReadStream(filePath)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    fileStream.pipe(res);

}

const getReceiverProfile = (userId) => {
    let sql = `select user_full_name, email, verification_access_code from profile_receiver p where user_id = ${userId}`
    return db.query(sql)
}

const getVerificationLink = (certId) => {
    let link = "http://localhost:3000/cert/verify/" + certId
    return link
}

export default { generateDigitalResume }