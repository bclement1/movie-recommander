"""Flask server for movies recommendations."""
from typing import Dict
from flask import Flask, render_template, request
from sparql_queries import category_query

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def home():
    if request.method == "POST":
        for category in request.form.values():
            query_res = category_query(category=category)
        headings = ["Title", "Abstract"]
        data = get_data_from_json(query_res)
        return render_template("answer.html", headings=headings, data=data)
    return render_template("home.html")


def get_data_from_json(json: Dict):
    data = []
    for result in json["results"]["bindings"]:
        abstract = result["abstract"]["value"]
        title = result["name"]["value"]
        data.append([title, abstract])
    return data


if __name__ == "__main__":
    app.run(debug=True)
