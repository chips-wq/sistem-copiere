// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handleCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST"){
    const db = await sqlite.open({filename:'./database.db' , driver:sqlite3.Database});
    const request_json = req.body
      
      await db.run(`INSERT INTO Category(name,description) VALUES (? , ?);` , request_json['name'] , request_json['description'])   
    res.status(201).json({
      "succes":true
    })
  }else if(req.method === "GET"){
    const db = await sqlite.open({filename:'./database.db' , driver:sqlite3.Database});
    const people = await db.all("SELECT * FROM Category;");
    res.json(people)
  }
}
