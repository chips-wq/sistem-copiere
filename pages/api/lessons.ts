// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { remark } from 'remark'
import html from 'remark-html'
const jsdom = require('jsdom')

const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export const processMarkdown = async (markdown:string) => {
  const processedContent = await remark()
  .use(html)
  .process(markdown)

const document = new jsdom.JSDOM(processedContent.toString()).window
  .document
const title = document.querySelector('h1,h2,h3,h4,h5,h6')
if (!title) {
  return {
    success:false,
    error: {
      message: 'Continutul trebuie sa contina cel putin un titlu.',
    },
  }
}
const paragraph = document.querySelector('p')
if (!paragraph) {  return {
  success:false,
  error: { 
    message: 'Continutul trebuie sa contina cel putin un paragraf.',
  },
}
}
  return {
    success:true,
    error:null,
    data:[title.textContent , paragraph.textContent.slice(0, 100)]
  }
}

export default async function handleLesson(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const db = await sqlite.open({
      filename: './database.db',
      driver: sqlite3.Database,
    })
    const request_json = req.body
    if (request_json['secret'] == '1234') {
      const result = await processMarkdown(request_json['markdown'])
      if(result.success === false){
        res.status(400).json({error:result.error})
        return
      }
      if(result.data){
        const [title , paragraph] = result.data;
        await db.run(
          `INSERT INTO Lesson(title , description , markdown,categoryId) VALUES (? , ?, ? , ?);`,
          title, paragraph,
          request_json['markdown'],
          request_json['categoryId']
        )

        res.status(201).json({
          succes: true,
        })
      }
      
    }

  } else if (req.method === 'GET') {
    const db = await sqlite.open({
      filename: './database.db',
      driver: sqlite3.Database,
    })
    const lessons = await db.all("SELECT * FROM Lesson;")
    res.json(lessons)
  }
}
