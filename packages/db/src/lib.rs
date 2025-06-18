pub mod config;
pub mod error;

use crate::{ error::DbResult, config::Config};

use sqlx::postgres::{PgPool, PgPoolOptions};
use tracing::info;
use std::time::Duration;

#[derive(Clone)]
pub struct Db {
    pool: PgPool,
}

impl Db {
    pub async fn new(config: &Config) -> DbResult<Self> {
        info!("Connecting to database...");

        let pool = PgPoolOptions::new()
        .max_connections(config.max_connections)
        .acquire_timeout(Duration::from_secs(config.connect_timeout))
        .connect(&config.url)
        .await?;

        sqlx::query("SELECT 1").execute(&pool).await?;
         
        info!("Database Connected Successfully");
        Ok(Self { pool })
    }

    pub fn pool(&self) -> &PgPool {
        &self.pool
    }

    pub async fn health_check(&self) -> DbResult<()> {
        sqlx::query("SELECT 1")
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    pub async fn close(&self) {
        self.pool.close().await;
    }
}