using System;

namespace Pather.Servers.Utils.Linode.ResponseModels
{
    [Serializable]
    public class ImageListResponse
    {
        public string CREATE_DT ;
        public string CREATOR ;
        public string DESCRIPTION ;
        public string FS_TYPE ;
        public int IMAGEID ;
        public int ISPUBLIC ;
        public string LABEL ;
        public string LAST_USED_DT ;
        public int MINSIZE ;
        public string STATUS ;
        public string TYPE ;

    }
    [Serializable]
    public class CreateInstanceResponse
    {
        public string LinodeID;
    }


}