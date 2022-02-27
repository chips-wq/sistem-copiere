// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import sqlite from 'sqlite'
// import sqlite3 from 'sqlite3'
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function getCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: './database.db',
    driver: sqlite3.Database,
  })
  const category = await db.get(
    'SELECT * FROM Category where id = ?;',
    req.query.id
  )
  res.json(category)
  //   const category = await db.all(
  //     'SELECT * FROM Lesson WHERE categoryId= ? ;',
  //     req.query.id
  //   )
  //   res.json(lessons)
}
