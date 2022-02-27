// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { remark } from 'remark'
import html from 'remark-html'
import fs from 'fs'
const jsdom = require('jsdom')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function simpleLesson(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: './database.db',
    driver: sqlite3.Database,
  })
  const lesson = await db.get('SELECT * FROM Lesson WHERE id=?;', req.query.id)
  const lessonHtml = await (
    await remark().use(html).process(lesson.markdown)
  ).toString()

  const data = fs.readFileSync('./simple.html', 'utf8')
  const document = new jsdom.JSDOM(data).window.document
  document.getElementById('content').innerHTML = lessonHtml

  let documentStr = document.documentElement.innerHTML

  res.send(documentStr)
}
