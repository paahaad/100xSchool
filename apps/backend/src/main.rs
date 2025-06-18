pub mod handlers;
pub mod routes;
pub mod services;
pub mod utils;

use axum::{
    http::{
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        Method,
    },
    Extension,
};
use db::{config::Config, Db};
use routes::route::create_router;
use std::{net::SocketAddr, sync::Arc};
use tower_http::cors::{AllowOrigin, CorsLayer};
use tracing::{error, info};
use tracing_subscriber;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let db_config = match Config::new() {
        Ok(config) => config,
        Err(e) => {
            error!("Failed to load database configuration: {}", e);
            std::process::exit(1);
        }
    };

    let db_client = match Db::new(&db_config).await {
        Ok(db) => Arc::new(db),
        Err(e) => {
            error!("Failed to connect to database: {}", e);
            std::process::exit(1);
        }
    };

    if let Err(e) = db_client.health_check().await {
        error!("Database health check failed: {}", e);
        std::process::exit(1);
    }

    let cors: CorsLayer = CorsLayer::new()
        .allow_origin(AllowOrigin::any())
        .allow_methods([Method::GET, Method::POST])
        .allow_headers([ACCEPT, AUTHORIZATION, CONTENT_TYPE]);

    let app = create_router().layer(Extension(db_client)).layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();

    info!("🚀 APPLICATION ROLLING ON 3000");
    info!("✅ CONNECTED TO DATABASE");
    axum::serve(listener, app).await.unwrap()
}
