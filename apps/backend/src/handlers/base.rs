use axum::Json;
use serde_json::{json, Value};
use std::time::{SystemTime, UNIX_EPOCH};

pub async fn health_check() -> Json<Value> {
    Json(json!({
        "status": "Application is up and running",
        "timestamp": SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs()
    }))
}

// Example handler showing how to access the database
// pub async fn create_user(
//     Extension(db): Extension<Arc<Db>>,
//     Json(payload): Json<CreateUserRequest>,
// ) -> Result<Json<UserResponse>, StatusCode> {
//     // Here you would use the database to create a user
//     // For now, we'll just show that we have access to the db connection
    
//     // You can access the database pool like this:
//     let _pool = db.pool();
    
//     // Example: You could run queries here
//     // let result = sqlx::query!("INSERT INTO users (username, email) VALUES ($1, $2)", 
//     //     payload.username, payload.email)
//     //     .execute(pool)
//     //     .await
//     //     .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

//     Ok(Json(UserResponse {
//         message: format!("User creation request received for: {}", payload.username),
//         user_id: Some("example-id".to_string()),
//     }))
// }