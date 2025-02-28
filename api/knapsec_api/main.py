from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from knapsec_api.v1 import router as v1_router

app = FastAPI(
    title="knapsec-api",
    description="API for the knapsec project",
    version="0.1.0",
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router, prefix="/v1", tags=["v1"])
