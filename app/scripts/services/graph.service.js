angular.module("diplomaApp")
    .factory('Graph', function($firebaseArray, FirebaseUrl, Themes, Subjects){
        var _generateGraphData = function() {
            function _doThemesHash(hash, themes, source) {
                for(var i = 0; i < themes.length; i++) {

                    console.log(themes[i]);


                    if(hash[themes[i]]) {
                        hash[themes[i]].size++;
                    } else {
                        var theme = Themes.themes.$getRecord(themes[i]);


                        console.log(theme);


                        hash[themes[i]] = {
                            id: theme.$id,
                            label: theme.name,
                            x: 0,
                            y: 0,
                            size: 1,
                            color: "#FFCE42" // yellow
                        };
                    }
                    edges.push({
                        id: (source + "-" +  hash[themes[i]].id),
                        source: source,
                        target: hash[themes[i]].id
                    });
                }
                return hash;
            }

            var edges = [];

            var themes_hash = {};
            var positions_nodes = [];
            for(var i = 0; i < o.positions.length; i++) {
                console.log(o.positions[i]);
                positions_nodes.push({
                    id: o.positions[i].$id,
                    label: o.positions[i].name,
                    x: -10,
                    y: 0,
                    size: 5,
                    color: "#DD4C40" // red
                });
                _doThemesHash(themes_hash, o.positions[i]["themes"], o.positions[i].$id);
            }

            var specialities_nodes = [];
            for(var i = 0; i < o.specialities.length; i++) {
                specialities_nodes.push({
                    id: o.specialities[i].$id,
                    label: o.specialities[i].name,
                    x: 10,
                    y: 0,
                    size: 5,
                    color: "#139F5A" // green
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

            var themes_nodes = _convertHashToArray(themes_hash);

            var nodes = positions_nodes.concat(specialities_nodes).concat(themes_nodes);
            // console.log(nodes);

            return {
                nodes: nodes,
                edges: edges
            };

            // return {
            //     "nodes": [
            //         {
            //             "id": "n0",
            //             "label": "A node",
            //             "x": 0,
            //             "y": 0,
            //             "size": 3,
            //             "color": "#DD4C40" // red
            //         },
            //         {
            //             "id": "n1",
            //             "label": "Another node",
            //             "x": 3,
            //             "y": 1,
            //             "size": 2,
            //             "color": "#139F5A" // green
            //         },
            //         {
            //             "id": "n2",
            //             "label": "And a last one",
            //             "x": 1,
            //             "y": 3,
            //             "size": 1,
            //             "color": "#FFCE42" // yellow
            //         }
            //     ],
            //     "edges": [
            //         {
            //             "id": "e0",
            //             "source": "n0",
            //             "target": "n1"
            //         },
            //         {
            //             "id": "e1",
            //             "source": "n1",
            //             "target": "n2"
            //         },
            //         {
            //             "id": "e2",
            //             "source": "n2",
            //             "target": "n0"
            //         }
            //     ]
            // };
        };


        function _convertHashToArray(tmp) {

            console.log(tmp);

            var array = [];
            for (var property in tmp) {
                if (tmp.hasOwnProperty(property)) {
                    array.push(tmp[property]);
                }
            }

            console.log(array);

            return array;
        }

        var _setupSigma = function() {

            var graph = _generateGraphData();

            console.log(graph);

            var s = new sigma({
                renderers: [
                    {
                        container: document.getElementById('graph-container'),
                        type: 'canvas' // sigma.renderers.canvas works as well
                    }
                ],
                graph: graph,
                settings: {
                    labelThreshold: 10,
                    doubleClickEnabled: false,
                    defaultEdgeType: "arrow",
                    minArrowSize: 7,
                    animationsTime: 500,
                    sideMargin: 10,
                    zoomMin: 0.1,
                    zoomMax: 5,
                    zoomingRatio: 1.5,

                    enableEdgeHovering: true,
                    edgeHoverSizeRatio: 2

                    // edge hovering settings. Maybe they'll help someday
                    //doubleClickZoomingRatio: 2,
                    //enableEdgeHovering: true,
                    //edgeHoverColor: 'edge',
                    //edgeHoverSizeRatio: 1,
                    //edgeHoverExtremities: true,
                    //minEdgeSize: 0.5,
                    //maxEdgeSize: 4
                }
            });

            // sigma.plugins.dragNodes(s, s.renderers[0]);
            // sigma.plugins.highlightNeighbors(s);

            return s;
        };

        var o = {};
        o.graphShowed = false;
        o.specialities = [];
        o.positions = [];
        o.s = _setupSigma();

        o.refreshGraph = function () {
            var graph = _generateGraphData();
            console.log(graph);
            o.s.graph.clear().read(graph);

            o.s.refresh({skipIndexation: true}).refresh();  // TODO get what the fuck it works

            console.log(o.s);

            o.s.startForceAtlas2();

            setTimeout(1000, o.s.stopForceAtlas2());
        };

        return o;


    }); 