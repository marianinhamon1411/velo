import { db } from './playwright/support/database.ts'

async function run() {
  const orders = await db.selectFrom('orders').selectAll().execute()
  console.log('Orders in DB:', orders.map(o => o.order_number))
  process.exit(0)
}

run().catch(console.error)
