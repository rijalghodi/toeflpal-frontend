export const routes = {
  home: '/',

  // auth
  auth: {
    forgotPassword: '/forgot-password',
    login: '/login',
    register: '/register',
  },

  // user
  dashboard: '/toefl',
  toeflList: '/toefl',
  toeflDetail: (toeflId: string) => `/toefl/${toeflId}`,
  toeflReading: (toeflId: string) => `/toefl/${toeflId}/reading`,
  toeflListening: (toeflId: string) => `/toefl/${toeflId}/listening`,
  toeflGrammar: (toeflId: string) => `/toefl/${toeflId}/grammar`,
  practiceList: '/practice',
  lessonList: '/lesson',

  // admin
  adminToeflList: '/admin/toefl',
  adminPracticeList: '/admin/practice',
  adminLessonList: '/admin/lesson',
  adminToeflDetail: (toeflId: string) => `/admin/toefl/${toeflId}`,
  adminReferenceList: '/admin/reference',
  // Form
  adminFormEditor: (formId: string, toeflId: string) =>
    `/admin/toefl/${toeflId}/${formId}`,
  adminFormPreview: (formId: string, toeflId: string) =>
    `/admin/toefl/${toeflId}/${formId}/preview`,
};
