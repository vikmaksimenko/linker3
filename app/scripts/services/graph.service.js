angular.module("diplomaApp")
    .factory('Graph', function($firebaseArray, FirebaseUrl){
        var json = {
            "nodes": [
                {
                    "id": "n0",
                    "label": "A node",
                    "x": 0,
                    "y": 0,
                    "size": 3
                },
                {
                    "id": "n1",
                    "label": "Another node",
                    "x": 3,
                    "y": 1,
                    "size": 2
                },
                {
                    "id": "n2",
                    "label": "And a last one",
                    "x": 1,
                    "y": 3,
                    "size": 1
                }
            ],
            "edges": [
                {
                    "id": "e0",
                    "source": "n0",
                    "target": "n1"
                },
                {
                    "id": "e1",
                    "source": "n1",
                    "target": "n2"
                },
                {
                    "id": "e2",
                    "source": "n2",
                    "target": "n0"
                }
            ]
        };

        var _setupSigma = function() {
            var s = new sigma({
                renderers: [
                    {
                        container: document.getElementById('graph-container'),
                        type: 'canvas' // sigma.renderers.canvas works as well
                    }
                ],
                graph: json,
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

            sigma.plugins.dragNodes(s, s.renderers[0]);
            // sigma.plugins.highlightNeighbors(s);

            return s;
        };

        var o = {};
        o.graphShowed = false;
        o.s = _setupSigma();

        o.refreshGraph = function () {
            console.log("refresh");
            o.s.refresh({skipIndexation: true}).refresh();  // TODO get what the fuck it works
        };

        return o;


    }); 