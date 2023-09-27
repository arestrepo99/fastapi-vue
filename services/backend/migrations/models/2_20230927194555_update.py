from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "notes" ADD "img_url" VARCHAR(1024);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "notes" DROP COLUMN "img_url";"""
