"""Generate and send SparQL queries to DBpedia API's SparQL endpoint."""
from typing import Optional
import logging
from SPARQLWrapper import SPARQLWrapper, JSON

HOUR_TO_SECOND = 3600
logging.basicConfig(level=logging.INFO)


def query_dbpedia(category: str, actor: str, time: str):
    """Query DBpedia using SparQL and return the result (JSON format)."""
    sparql = SPARQLWrapper("https://dbpedia.org/sparql")
    query_txt = generate_query_txt(category=category, actor=actor, time=time)
    logging.info("SparQL query reads: \n{}".format(query_txt))
    sparql.setQuery(query_txt)
    sparql.setReturnFormat(JSON)
    query_res = sparql.query().convert()
    return query_res


def generate_query_txt(
    category: Optional[str] = None,
    actor: Optional[str] = None,
    time: Optional[str] = None,
):
    """Return a SparQL query generated using the fields specified by the user."""
    if not category and not actor and not time:
        logging.error("No argument specified. Can not generate SparQL query.")
        raise ValueError
    # SELECT section
    query_txt = "SELECT DISTINCT ?film, ?abstract, ?name, ?run"
    # WHERE section
    query_txt += "\nWHERE\n{\n"
    query_txt += "?film rdf:type dbo:Film . \n"
    if category:
        category = category.replace("-", "_")
        query_txt += "?film dbo:wikiPageWikiLink dbr:{}_film .\n".format(category)
    query_txt += "?film rdfs:comment ?abstract .\n"
    query_txt += "?film dbp:name ?name . \n"
    query_txt += "?film dbo:runtime ?run . \n"
    if actor:
        actor = actor.replace(" ", "_")
        query_txt += "?film dbo:starring dbr:{} . \n".format(actor)
    # Duration filter
    if time:
        query_txt = query_time_filter(time=time, query_txt=query_txt)
    # Language filter
    query_txt += "FILTER langMatches(lang(?abstract), 'en')\n"
    # End of WHERE section
    query_txt += "} LIMIT 100"
    return query_txt


def query_time_filter(time: str, query_txt: str):
    if time != "inf":
        time_float = float(time)
        query_txt += "FILTER( ?run <= {}) .\n".format(time_float * HOUR_TO_SECOND)
    return query_txt
