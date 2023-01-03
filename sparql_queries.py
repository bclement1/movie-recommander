from SPARQLWrapper import SPARQLWrapper, JSON
from pprint import pprint


def category_query(category: str):
    sparql = SPARQLWrapper("https://dbpedia.org/sparql")
    query_txt = generate_query_txt(category)
    print(query_txt)
    sparql.setQuery(query_txt)
    sparql.setReturnFormat(JSON)
    query_res = sparql.query().convert()
    return query_res


def generate_query_txt(category: str):
    category = category.replace("-", "_")
    # SELECT section
    query_txt = "SELECT DISTINCT ?film, ?abstract, ?name"
    # WHERE section
    query_txt += "\nWHERE\n{\n"
    query_txt += "?film dbo:wikiPageWikiLink dbr:{}_film .\n".format(category)
    query_txt += "?film rdfs:comment ?abstract .\n"
    query_txt += "?film dbp:name ?name . \n"
    query_txt += "FILTER langMatches(lang(?abstract), 'en')\n"
    # End of WHERE section
    query_txt += "} LIMIT 5"
    return query_txt
