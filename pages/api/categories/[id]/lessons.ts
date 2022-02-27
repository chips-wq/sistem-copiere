// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function getAllCategories(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: './database.db',
    driver: sqlite3.Database,
  })
  const lessons = await db.all(
    'SELECT id , title , description , categoryId FROM Lesson WHERE categoryId= ? ;',
    req.query.id
  )
  res.json(lessons)
}
