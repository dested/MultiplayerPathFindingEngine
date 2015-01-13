using System;

namespace GameLogic.Common
{
    [Serializable]
    public class LogicGridItem
    {
        public LogicGridItem(LogicGridItemType type, int value=int.MinValue)
        {
            Type = type;
            Value = value;
        }

        public LogicGridItemType Type;
        public int Value;
    }
}