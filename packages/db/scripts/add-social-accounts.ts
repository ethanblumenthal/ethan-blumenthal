import { db, socialAccounts } from '../';
import { sql } from 'drizzle-orm';

async function addSocialAccounts() {
  try {
    console.log('Adding social accounts...');

    // Add X (Twitter) account
    await db
      .insert(socialAccounts)
      .values({
        platform: 'twitter',
        username: 'ethanblumenthal',
        displayName: 'Ethan Blumenthal',
        profileUrl: 'https://x.com/ethanblumenthal',
        followers: 1000, // This will be updated when we fetch from API
        isActive: true,
      })
      .onConflictDoNothing();

    // Add LinkedIn account
    await db
      .insert(socialAccounts)
      .values({
        platform: 'linkedin',
        username: 'ethanblumenthal',
        displayName: 'Ethan Blumenthal',
        profileUrl: 'https://www.linkedin.com/in/ethanblumenthal/',
        followers: 500, // This will be updated when we fetch from API
        isActive: true,
      })
      .onConflictDoNothing();

    console.log('Social accounts added successfully!');

    // Verify accounts were added
    const accounts = await db.select().from(socialAccounts);
    console.log('Current social accounts:', accounts);

    process.exit(0);
  } catch (error) {
    console.error('Error adding social accounts:', error);
    process.exit(1);
  }
}

addSocialAccounts();
