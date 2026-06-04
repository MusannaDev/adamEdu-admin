export enum CourseType {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  PLATINUM = "PLATINUM",
}

export enum CourseDuration {
  MONTH = 1, //1 month
  QUARTER_YEAR = 4, // 4 months
  HALF_YEAR = 6, // 6 months
  YEAR = 12, // 1 year
}

export enum CourseVolume {
  HALF_HOUR     = 0.5,   // 30 daqiqa
  ONE_HOUR      = 1,     // 1 soat
  NINETY_MINUTES = 1.5,  // 1.5 soat (90 daqiqa)
  TWO_HOURS     = 2,     // 2 soat
  ONE_POINT_TWO = 2.5,   // agar kerak bo‘lsa saqlash mumkin (masalan, 72 daqiqa)
}

export enum CourseStatus {
  PAUSE = "PAUSE",
  PROCESS = "PROCESS",
  DELETE = "DELETE",
}

export enum CourseCollection {
  IT = "IT",
  LANGUAGE = "LANGUAGE", 
  FINANCE = "FINANCE",
  MATH = "MATH",
  SCIENCE = "SCIENCE",
  OTHER = "OTHER",
}