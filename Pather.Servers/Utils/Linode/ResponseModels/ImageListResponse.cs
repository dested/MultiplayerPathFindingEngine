using System;
using System.Runtime.CompilerServices;

namespace Pather.Servers.Utils.Linode.ResponseModels
{
    [Serializable, PreserveMemberCase]

    public class ImageListResponse
    {
        public string CREATE_DT;
        public string CREATOR;
        public string DESCRIPTION;
        public string FS_TYPE;
        public int IMAGEID;
        public int ISPUBLIC;
        public string LABEL;
        public string LAST_USED_DT;
        public int MINSIZE;
        public string STATUS;
        public string TYPE;

    }
    [Serializable, PreserveMemberCase]

    public class CreateInstanceResponse
    {
        public string LinodeID;
    }

    [Serializable, PreserveMemberCase]
    public class LinodeIPListResponse
    {
        public int LINODEID;
        public int ISPUBLIC;
        public string IPADDRESS;
        public string RDNS_NAME;
        public int IPADDRESSID;
    }

    [Serializable, PreserveMemberCase]
    public class LinodeDiskCreateResponse
    {
        public int JobID;
        public int DiskID;
    }

    [Serializable, PreserveMemberCase]
    public class LinodeConfigCreate
    {
        public int ConfigID;

    }

    [Serializable, PreserveMemberCase]
    public class LinodeJobListResponse
{
public string ENTERED_DT ;
public string ACTION ;
public string LABEL ;
public string HOST_START_DT ;
public int LINODEID ;
public string HOST_FINISH_DT ;
public int DURATION ;
public string HOST_MESSAGE ;
public int JOBID ;
public bool HOST_SUCCESS ;
}



}