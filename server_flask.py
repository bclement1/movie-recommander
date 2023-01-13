"""Flask server for movies recommendations."""
from typing import Dict
from flask import Flask, render_template, request
import json
from sparql_queries import query_dbpedia


HOUR_TO_SECOND = 3600
HOUR_TO_MINUTE = 60

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def home():
    """Handle website's home page."""
    if request.method == "POST":
        # user entered its preferences, query DBpedia and return the result
        preferences = list(request.form.values())
        # Make queries
        query_pref = query_dbpedia(
            category=preferences[0], actor=preferences[1], duration=preferences[2]
        )
        query_same_cat = query_dbpedia(category=preferences[0])
        query_same_actor = query_dbpedia(actor=preferences[1])
        headings = ["Title", "Abstract", "Runtime"]
        # Extract relevant information from the queries results
        data_pref = get_data_from_json(query_pref)
        data_same_cat = get_data_from_json(query_same_cat)
        data_same_actor = get_data_from_json(query_same_actor)

        """Pour test - Clément (fais office de placeholder pour l'instant)"""
        main_list = {
            "data": [
                {"title": "title1", "abstract": "abstract1", "img": None},
                {"title": "nicolas", "abstract": "abstract2", "img": None},
                {"title": "title3", "abstract": "abstract3", "img": None},
            ]
        }
        reco_list1 = {
            "data": [
                {"title": "title1", "abstract": "abstract1", "img": None},
                {"title": "nicolas", "abstract": "abstract2", "img": None},
                {"title": "title3", "abstract": "abstract3", "img": None},
            ]
        }
        reco_list2 = {
            "data": [
                {"title": "title1", "abstract": "abstract1", "img": None},
                {"title": "title2", "abstract": "abstract2", "img": None},
                {"title": "title3", "abstract": "abstract3", "img": None},
            ]
        }
        return render_template(
            "answer.html",
            headings=headings,
            data_pref=data_pref,
            data_same_cat=data_same_cat,
            data_same_actor=data_same_actor,
            name="answer",
            main_list=json.dumps(main_list),
            reco_list1=json.dumps(reco_list1),
            reco_list2=json.dumps(reco_list2),
        )
    # else, keep the app running
    return render_template("home.html", name="home")


def get_data_from_json(json: Dict):
    """Parse the JSON file received from the query to DBpedia."""
    data = []
    for result in json["results"]["bindings"]:  # iterate over matching movies
        movie_abstract = result["abstract"]["value"]
        movie_title = result["name"]["value"]
        movie_runtime = convert_runtime(result["run"]["value"])
        data.append([movie_title, movie_abstract, movie_runtime])
    return data


def convert_runtime(runtime: str):
    """Convert runtime format to hours/minutes"""
    # Run time in seconds
    runtime_float = float(runtime)
    hours = int(runtime_float // HOUR_TO_SECOND)
    minutes = int((runtime_float % HOUR_TO_SECOND) // HOUR_TO_MINUTE)
    runtime = "{}h{}min".format(hours, minutes)
    return runtime


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
