use std::env;

pub struct Config {
    pub url: String,
    pub max_connections: u32,
    pub connect_timeout: u64,
}

impl Config {
    pub fn new() -> Result<Self, env::VarError> {
        Ok(Self {
            url: env::var("DATABASE_URL")?,
            max_connections: env::var("DB_MAX_CONNECTIONS")
                .unwrap_or_else(|_| "10".to_string())
                .parse()
                .unwrap_or(10),
            connect_timeout: env::var("DB_CONNECT_TIMEOUT")
                .unwrap_or_else(|_| "30".to_string())
                .parse()
                .unwrap_or(30),
        })
    }
}