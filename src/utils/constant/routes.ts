export const routes = {
  home: '/',

  // auth
  auth: {
    forgotPassword: '/forgot-password',
    login: '/login',
    register: '/register',
  },

  // user
  dashboard: '/dashboard',
  toeflList: '/toefl',
  toeflDetail: (toeflId: string) => `/toefl/${toeflId}`,
  practiceList: '/practice',
  lessonList: '/lesson',

  // admin
  adminToeflList: '/admin/toefl',
  adminPracticeList: '/admin/practice',
  adminLessonList: '/admin/lesson',
  adminToeflDetail: (toeflId: string) => `/admin/toefl/${toeflId}`,
  adminFormUpdate: (formId: string) => `/admin/toefl/${formId}/update`,
};
