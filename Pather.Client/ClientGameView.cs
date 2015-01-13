using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using Pather.Client.GameFramework;
using Pather.Client.Utils;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Client
{
    public   class ClientGameView
    {
        private readonly IClientInstantiateLogic clientInstantiateLogic;

        public readonly ClientGameManager ClientGameManager;

        public ClientGameView(IClientInstantiateLogic clientInstantiateLogic)
        {
            this.clientInstantiateLogic = clientInstantiateLogic;

            if (this.clientInstantiateLogic == null)
            {
                this.clientInstantiateLogic = new DefaultClientInstantiateLogic();
            }

            ClientGameManager =clientInstantiateLogic.CreateClientGameManager();
            ClientGameManager.OnReady += ReadyToPlay;


            NextGameTime = new DateTime().GetTime();

            CurGameTime = new DateTime().GetTime();
            CurTickTime = new DateTime().GetTime();

            Global.SetTimeout(() => Tick(), 1);
        }

        public virtual void ReadyToPlay()
        {
            
        }
    

        public long CurTickTime;
        public long TickNumber;

        public long CurGameTime;
        public long NextGameTime;
        public int ServerLatency;
        public long TrackTickNumber;
        public long TrackLockstepTickNumber;


        public double PercentCompletedWithLockStep
        {
            get
            {
                var vc = new DateTime().GetTime();
                var l = (vc - ClientGameManager.FrontEndTickManager.CurrentLockstepTime);

                return l/(double) Constants.LockstepTicks;
            }
        }


        public void Tick()
        {
            Global.SetTimeout(Tick, 1);


            var vc = new DateTime().GetTime();

            var l2 = (vc - CurTickTime);
            var nextTickTime = l2/Constants.GameTicks;
            while (nextTickTime > TrackTickNumber)
            {
                TrackTickNumber++;
                TickNumber++;

                ClientGameManager.Tick(TickNumber);
                //todo probably should only happen once? and not in the loop
                var v = new DateTime().GetTime();
                NextGameTime += v - CurGameTime;
                CurGameTime = v;
            }
        }
    }
}