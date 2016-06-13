angular.module("diplomaApp")
    .factory('Graph', function($firebaseArray, FirebaseUrl, Themes, Subjects){
        var _generateGraphData = function() {
            var data = [];
            var themes_hash = {};

            function _doThemesHash(hash, themes, source) {
                for(var i = 0; i < themes.length; i++) {
                    if(hash[themes[i]]) {
                        hash[themes[i]].data.size += 5;
                    } else {
                        var theme = Themes.themes.$getRecord(themes[i]);
                        hash[themes[i]] = {
                            group: 'nodes',
                            classes: 'theme',
                            data: {
                                id: theme.$id,
                                size: 10,
                                name: theme.name
                            }
                        };
                    }
                    data.push({
                        group: "edges",
                        data: {
                            id: (source + "-" +  hash[themes[i]].data.id),
                            source: source,
                            target: hash[themes[i]].data.id
                        }
                    });
                }
                return hash;
            }

            for(var i = 0; i < o.positions.length; i++) {
                data.push({
                    group: 'nodes',
                    classes: 'position',
                    data: {
                        id: o.positions[i].$id,
                        size: 30,
                        name: o.positions[i].name
                    }
                });
                _doThemesHash(themes_hash, o.positions[i]["themes"], o.positions[i].$id);
            }

            for(var i = 0; i < o.specialities.length; i++) {
                data.push({
                    group: 'nodes',
                    classes: 'speciality',
                    data: {
                        id: o.specialities[i].$id,
                        size: 30,
                        name: o.specialities[i].name
                    }
                });
                if(o.specialities[i].hasOwnProperty("subjects")) {
                    var subjects = o.specialities[i].subjects;
                    for(var j = 0; j < subjects.length; j++) {
                        _doThemesHash(themes_hash,Subjects.subjects.$getRecord(subjects[j]).themes, o.specialities[i].$id);
                    }
                }
                if(o.specialities[i].hasOwnProperty("themes")) {
                    _doThemesHash(themes_hash, o.specialities[i]["themes"], o.specialities[i].$id);
                }
            }

            data = data.concat(_convertHashToArray(themes_hash));

            console.log(data);

            return data;

        };

        function _convertHashToArray(tmp) {
            var array = [];
            for (var property in tmp) {
                if (tmp.hasOwnProperty(property)) {
                    array.push(tmp[property]);
                }
            }

            console.log(array);

            return array;
        }

        var _setupGraph = function() {
            var graph = _generateGraphData();
            var cy = window.cy = cytoscape({
                container: document.getElementById('graph-container'),
                style: [
                    {
                        selector: 'node',
                        style: {
                            'content': 'data(name)',
                            "width": "data(size)",
                            "height": "data(size)",
                            "background-color": "#FFCE42",  // yellow
                            "color": "#282A30"              // dark-grey
                        }
                    }, {
                        selector: 'node.position',
                        style: {
                            "background-color": "#DD4C40",  // red
                            "shape": "diamond"
                        }
                    }, {
                        selector: 'node.speciality',
                        style: {
                            "background-color": "#139F5A",  // green
                            "shape": "diamond"

                        }
                    }
                ]

            });
            // var layout = cy.makeLayout({ name: 'breadthfirst' });
            // layout.run();
            // cy.center().center();
            return cy;
        };

        var o = {};
        o.graphShowed = false;
        o.specialities = [];
        o.positions = [];
        o.cy = _setupGraph();

        o.refreshGraph = function () {
            var graph = _generateGraphData();
            o.cy.remove("node");
            o.cy.add(graph);
            o.cy.center();
            o.cy.makeLayout({ name: 'grid' }).run();
        };

        return o;


    }); 