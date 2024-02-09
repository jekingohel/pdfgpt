from . import db
from datetime import datetime

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_id = db.Column(db.String, unique=True)
    text = db.Column(db.String)
    messages = db.Column(db.JSON)

class UploadedFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.String(36), unique=True, nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    text = db.Column(db.Text, nullable=True)
    summary = db.Column(db.Text, nullable=True)
    questions = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<UploadedFile {self.filename}>"