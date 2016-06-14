angular.module("diplomaApp")
    .factory('Graph', function($firebaseArray, FirebaseUrl, Themes, Positions, Specialities, Subjects, $mdDialog){
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
                                name: theme.name,
                                type: "theme"
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
                        name: o.positions[i].name,
                        type: "position"
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
                        name: o.specialities[i].name,
                        type: "speciality"
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
            return data;
        };

        function _convertHashToArray(tmp) {
            var array = [];
            for (var property in tmp) {
                if (tmp.hasOwnProperty(property)) {
                    array.push(tmp[property]);
                }
            }
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
                            "shape": "roundrectangle"
                        }
                    }, {
                        selector: 'node.speciality',
                        style: {
                            "background-color": "#139F5A",  // green
                            "shape": "roundrectangle"

                        }
                    }
                ]

            });
            cy.on('tap', 'node', showNodeData);
            return cy;
        };

        function showNodeData(evt) {
            var node = evt.cyTarget;
                 cy.animate({
                center: {
                    eles: node
                }
            }, {
                duration: 500
            });

            var nodeInfo;
            if(node.data().type == "theme") {
                nodeInfo = Themes.themes.$getRecord(node.id());
            } else if(node.data().type == "position") {
                nodeInfo = Positions.positions.$getRecord(node.id());
            } else if(node.data().type == "speciality") {
                nodeInfo = Specialities.specialities.$getRecord(node.id());
            }
            
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#graph-controller')))
                    .clickOutsideToClose(true)
                    .title(nodeInfo.name)
                    .textContent(nodeInfo.info || "No detailed info provided")
                    .ariaLabel(nodeInfo.name + ' Info Dialog')
                    .ok('Got it!')
                    .targetEvent(evt)
            );
        }

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
            o.cy.makeLayout({ name: 'cose' }).run();
        };

        return o;


    }); 