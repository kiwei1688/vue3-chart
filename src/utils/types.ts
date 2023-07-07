// 校驗註冊數據型態 (加?為可給也可不給)
export interface registerType {
  name?: string;
  email: string;
  password: string;
  password2?: string;
  identity?: string;
}

// 校驗註冊輸入數據型態
export interface registerRulesType {
  name?: ({
    required: boolean;
    message: string;
    trigger: string
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
  })[];
  email: {
    type: string;
    required: boolean;
    message: string;
    trigger: string;
  }[];
  password: ({
    required: boolean;
    message: string;
    trigger: string
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
  })[];
  password2?: ({ // 確認密碼
    required: boolean;
    message: string;
    trigger: string
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string; // 觸發
  } | {
    validator: (rule: any, value: string, callback: any) => void,
    trigger: string;
  })[];
}

// 校驗用戶數據型態 (加?為可給也可不給)
export interface userType {
  name:string,
  avatar: string,
  exp: number,
  iat: number,
  id: string,
  identity: string,
}

// 彈窗 - form表單數據類型
export interface formDataTypes {
  type: string;
  describe: string;
  income: string;
  expend: string;
  cash: string;
  remark: string;
  _id?: string;
}

// 彈窗 - form表單規則
export interface formRulesTypes {
  describe: {
      required: boolean;
      message: string;
      trigger: string;
  }[];
  income: {
      required: boolean;
      message: string;
      trigger: string;
  }[];
  expend: {
      required: boolean;
      message: string;
      trigger: string;
  }[];
  cash: {
    required: boolean;
    message: string;
    trigger: string;
  }[];
}