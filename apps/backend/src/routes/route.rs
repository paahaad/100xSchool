use crate::handlers::base::health_check;

use axum::{
    Router,
    routing::get,
};


pub fn create_router() -> Router {
    Router::new().route("/healthcheck", get(health_check))
}

pub fn auth_router() -> Router {
    // email password based jwt login system
    todo!()
}

pub fn admin_router() -> Router {
    // verify jwt if role==admin allow; or 🖕🏻
    todo!()
}

pub fn teacher_router() -> Router {
    todo!()
}

pub fn student_router() -> Router {
    todo!()
}

pub fn parent_router() -> Router {
    todo!()
}