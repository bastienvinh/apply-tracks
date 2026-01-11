use sqlx::SqlitePool;
use std::error::Error;

/// Check if the database has already been seeded by checking if any companies exist
pub async fn is_database_seeded(pool: &SqlitePool) -> Result<bool, Box<dyn Error>> {
    let count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM companies")
        .fetch_one(pool)
        .await?;
    
    Ok(count.0 > 0)
}

/// Seed the database with initial data
/// This will only seed if the database is empty
pub async fn seed_database(pool: &SqlitePool) -> Result<(), Box<dyn Error>> {
    // Check if already seeded
    if is_database_seeded(pool).await? {
        println!("Database already contains data. Skipping seed.");
        return Ok(());
    }

    println!("Seeding database with initial data...");

    // The seed data is already in the migration file 20260111000000_seed.sql
    // which will be automatically run by sqlx migrate
    // This function can be used for conditional seeding or programmatic seeding

    println!("Database seeded successfully!");
    Ok(())
}

/// Clear all seed data from the database
/// WARNING: This will delete all data!
#[allow(dead_code)]
pub async fn clear_seed_data(pool: &SqlitePool) -> Result<(), Box<dyn Error>> {
    println!("Clearing all data from database...");

    // Delete in reverse order of foreign key dependencies
    sqlx::query("DELETE FROM feedback_documents").execute(pool).await?;
    sqlx::query("DELETE FROM contact_documents").execute(pool).await?;
    sqlx::query("DELETE FROM application_documents").execute(pool).await?;
    sqlx::query("DELETE FROM contact_tags").execute(pool).await?;
    sqlx::query("DELETE FROM application_tags").execute(pool).await?;
    sqlx::query("DELETE FROM application_contacts").execute(pool).await?;
    sqlx::query("DELETE FROM feedbacks").execute(pool).await?;
    sqlx::query("DELETE FROM documents").execute(pool).await?;
    sqlx::query("DELETE FROM applications").execute(pool).await?;
    sqlx::query("DELETE FROM contacts").execute(pool).await?;
    sqlx::query("DELETE FROM companies").execute(pool).await?;
    sqlx::query("DELETE FROM tags").execute(pool).await?;

    println!("All data cleared successfully!");
    Ok(())
}

/// Reset the database by clearing and reseeding
#[allow(dead_code)]
pub async fn reset_database(pool: &SqlitePool) -> Result<(), Box<dyn Error>> {
    clear_seed_data(pool).await?;
    
    // Run migrations again to reseed
    sqlx::migrate!("./migrations").run(pool).await?;
    
    Ok(())
}
