declare module AStar {

    interface AStarGraph_Static {
        new (grid: boolean[][]): AStarGraph_Instance;
    }
    interface AStarGraph_Instance {
        constructor(grid: boolean[][]);
        grid:AStarGridPoint[][];
    }

    interface AStarPath {
        x: number;
        y: number;
    }

    interface AStarGridPoint {

    }

    interface AStar {
        search(graph: AStarGraph_Instance, start: AStarGridPoint, end: AStarGridPoint): AStarPath[]
    }
}



declare var Graph: AStar.AStarGraph_Static;
declare var astar: AStar.AStar;