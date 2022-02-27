// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { processMarkdown } from '../lessons'
// import sqlite from 'sqlite'
// import sqlite3 from 'sqlite3'
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function getLesson(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
    const db = await sqlite.open({
      filename: './database.db',
      driver: sqlite3.Database,
    })
    const lesson = await db.get(
      'SELECT * FROM Lesson where id = ?;',
      req.query.id
    )
    res.json(lesson)
  }else if(req.method === "PUT"){
    const db = await sqlite.open({
      filename: './database.db',
      driver: sqlite3.Database,
    })

    const result = await processMarkdown(req.body['markdown'])
      if(result.success === false){
        res.status(400).json({error:result.error})
        return
      }
      if(result.data){
        const [title , paragraph] = result.data;
        await db.run("UPDATE Lesson SET title = ?, description = ? , markdown = ? WHERE id = ? ;" ,title , paragraph , req.body['markdown'], req.query.id)
        res.json({success:true})
      }
    
  }

}
