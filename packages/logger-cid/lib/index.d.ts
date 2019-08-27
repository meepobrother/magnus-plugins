interface LoggerCidOptions {
    /**
     * 某个人登录的token
     */
    token: string;
    /**
     * 访问时间
     */
    time: string;
    /**
     * 访问路径
     */
    path: string;
    /**
     * 访问类型 query mutation
     */
    type: string;
    /**
     * ip地址
     */
    ip: string;
}
interface Logger {
    ip: string;
}
