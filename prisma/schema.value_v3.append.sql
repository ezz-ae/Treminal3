// Append to your prisma/schema.prisma (or replace if starting fresh)
model Launch {
  id          String   @id @default(cuid())
  slug        String   @unique
  creatorId   String
  name        String
  symbol      String
  chainId     Int
  tokenAddr   String?  // filled after deploy
  createdAt   DateTime @default(now())
  trust       Trust?

  // basic analytics
  views       Int      @default(0)
  referrals   Referral[]
  quests      QuestSubmission[]
}

model Trust {
  id          String   @id @default(cuid())
  launch      Launch   @relation(fields: [launchId], references: [id])
  launchId    String   @unique

  // verifications — set by server jobs or post-deploy checks
  lpLocked    Boolean  @default(false)
  renounced   Boolean  @default(false)
  hasBlacklist Boolean @default(false)
  buyTaxBps   Int?     // 0..1000
  sellTaxBps  Int?
  updatedAt   DateTime @updatedAt
}

model Referral {
  id        String   @id @default(cuid())
  launch    Launch   @relation(fields: [launchId], references: [id])
  launchId  String
  referrer  String   // wallet/address or code
  count     Int      @default(0)  // visits
  mints     Int      @default(0)  // optional future metric
  createdAt DateTime @default(now())
  @@unique([launchId, referrer])
}

model Quest {
  id        String   @id @default(cuid())
  key       String   @unique // e.g., FOLLOW_X, TWEET_LINK, HOLD_X_HOURS
  title     String
  points    Int      @default(10)
  active    Boolean  @default(true)
}

model QuestSubmission {
  id        String   @id @default(cuid())
  launch    Launch?  @relation(fields: [launchId], references: [id])
  launchId  String?
  userId    String
  quest     Quest    @relation(fields: [questId], references: [id])
  questId   String
  proofUrl  String?
  points    Int      @default(0)
  createdAt DateTime @default(now())
}
