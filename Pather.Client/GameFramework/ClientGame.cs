using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using Pather.Common.GameFramework;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.Actions.ClientActions;
using Pather.Common.Models.Common.Actions.ClientActions.Base;
using Pather.Common.Models.GameSegment;
using Pather.Common.Utils;

namespace Pather.Client.GameFramework
{
    public class ClientGame : Game
    {
        public StepManager StepManager;

        public ClientGame(TickManager tickManager) : base(tickManager)
        {
            StepManager = new StepManager(this);
            tickManager.OnProcessLockstep += StepManager.ProcessAction;
            StepManager.ProcessClientAction += ClientProcessClientAction;
        }

        public void QueueClientAction(ClientAction action)
        {
            StepManager.QueueClientAction(action);
        }

        public void MyUserJoined(string userId, double x, double y)
        {
            var clientUser = (ClientGameUser)CreateGameUser(userId);
            clientUser.Controlled = true;
            clientUser.X = x;
            clientUser.Y = y;
            AddEntity(clientUser);
            MyUser = clientUser;
        }

        public override GameUser CreateGameUser(string userId)
        {
            return new ClientGameUser(this, userId);
        }

        public void ClientProcessClientAction(ClientAction action)
        {
            ClientGameUser user;
            switch (action.ClientActionType)
            {
                case ClientActionType.Move:
                    var moveAction = (MoveEntity_ClientAction) action;
                    user = (ClientGameUser) ActiveEntities[moveAction.EntityId];
                    if (user == null) return;
                    user.RePathFind(moveAction);
                    break;
                case ClientActionType.MoveEntityOnPath:
                    var moveEntityOnPath = (MoveEntityOnPath_ClientAction) action;
                    user = (ClientGameUser) ActiveEntities[moveEntityOnPath.EntityId];
                    if (user == null) return;

                    var removeStart = 0;
                    for (; removeStart < moveEntityOnPath.Path.Count; removeStart++)
                    {
                        var aStarLockstepPath = moveEntityOnPath.Path[removeStart];
                        if (aStarLockstepPath.RemoveAfterLockstep > tickManager.LockstepTickNumber)
                        {
                            removeStart--;
                            break;
                        }
                    }
                    moveEntityOnPath.Path.RemoveRange(0, removeStart);


                    user.SetPath(moveEntityOnPath.Path);
                    break;
                case ClientActionType.UpdateNeighbors:
                    var updateNeighborAction = (UpdateNeighborsClientAction)action;
                    UpdateNeighbors(updateNeighborAction.Added, updateNeighborAction.Removed);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void UpdateNeighbors(List<UpdatedNeighbor> added, List<string> removed)
        {
            foreach (var userId in removed)
            {
                var user = ActiveEntities[userId];
                ActiveEntities.Remove(user);
            }

            foreach (var updatedNeighbor in added)
            {
                var user = CreateGameUser(updatedNeighbor.UserId);
                user.X = updatedNeighbor.X;
                user.Y = updatedNeighbor.Y;
                AddEntity(user);
                foreach (var inProgressClientAction in updatedNeighbor.InProgressClientActions)
                {
                    ClientProcessClientAction(inProgressClientAction.Action);
                }
            }
        }
    }
}