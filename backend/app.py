from flask import Flask, jsonify
app = Flask(__name__)
@app.route('/api/data')
def get_data():
    return jsonify(message="这份数据来自 Flask 后端！")