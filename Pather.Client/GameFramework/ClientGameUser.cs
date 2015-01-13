using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Serialization;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.ClientActions;
using Pather.Common.Utils;

namespace Pather.Client.GameFramework
{
    public class ClientGameUser : GameUser
    {
        public bool Controlled;
            public List<AStarLockstepPath> Path;


        public ClientGameUser(ClientGame game, string userId)
            : base(game, userId)
        {
            Path = new List<AStarLockstepPath>();
        }

      

        public void RePathFind(MoveEntity_ClientAction destinationAction)
        {
            var graph = game.Board.AStarGraph;


            var start = graph.Grid[Utilities.ToSquare(X)][Utilities.ToSquare(Y)];
            var end = graph.Grid[Utilities.ToSquare(destinationAction.X)][Utilities.ToSquare(destinationAction.Y)];
            Path.Clear();
            Path.AddRange(AStar.Search(graph, start, end).Select(a => new AStarLockstepPath(a.X, a.Y)));
//            Global.Console.Log("Path", Json.Stringify(Path));
        }


        public void SetPath(List<AStarLockstepPath> path)
        {
            Path.Clear();
            Path.AddRange(path);
//            Global.Console.Log("Path", Json.Stringify(Path));
        }
    }
}