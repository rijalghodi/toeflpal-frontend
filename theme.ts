import {
  Button,
  createTheme,
  FileInput,
  Group,
  Loader,
  MantineProviderProps,
  Modal,
  Notification,
  NumberInput,
  PasswordInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';

import classes from '@/styles/mantine.module.css';

export const theme: MantineProviderProps['theme'] = createTheme({
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '40px',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },

  defaultRadius: 'sm',

  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 768px
    md: '62em', // 992px
    lg: '75em', // 1200px
    xl: '88em', // 1408px
  },

  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
  },

  headings: {
    fontWeight: '600',
    // properties for individual headings, all of them are optional
    sizes: {
      h1: { fontSize: '2.125rem' }, // 34px
      h2: { fontSize: '1.625rem' }, // 26px
      h3: { fontSize: '1.375rem' }, // 22px
      h4: { fontSize: '1.125rem' }, // 18px
      h5: { fontSize: '1rem' }, // 16px
      h6: { fontSize: '0.875rem' }, // 14px
    },
  },
  colors: {
    azure: [
      '#e7effe',
      '#87a6f1',
      '#5781ea',
      '#3f6fe7',
      '#3366e5',
      '#265ce3',
      '#2354ce',
      '#204cbb',
      '#1d45aa',
      '#1a3f9b',
    ],
  },
  primaryColor: 'indigo',
  primaryShade: 5,
  black: '#3f3f3f',
  white: '#fff',

  shadows: {
    xs: 'rgba(100, 100, 111, 0.2) 0px 3px 10px 0px',
    sm: 'rgba(100, 100, 111, 0.2) 0px 4px 20px 0px',
    md: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    lg: 'rgba(100, 100, 111, 0.2) 0px 10px 32px 0px',
    xl: 'rgba(100, 100, 111, 0.2) 0px 13px 32px 0px',
  },

  components: {
    TextInput: TextInput.extend({
      classNames: {
        label: classes.label,
        input: classes.input,
        wrapper: classes.wrapper,
      },
    }),
    PasswordInput: PasswordInput.extend({
      classNames: {
        label: classes.label,
        input: classes.input,
        innerInput: classes.input,
      },
    }),
    Textarea: Textarea.extend({
      classNames: {
        label: classes.label,
        input: classes.input,
        wrapper: classes.wrapper,
      },
    }),
    FileInput: FileInput.extend({
      classNames: {
        label: classes.label,
        input: classes.input,
        wrapper: classes.wrapper,
      },
    }),
    NumberInput: NumberInput.extend({
      classNames: {
        label: classes.label,
        input: classes.input,
        wrapper: classes.wrapper,
      },
    }),
    Select: Select.extend({
      classNames: {
        label: classes.label,
        input: classes.input,
        dropdown: classes.dropdown,
      },
    }),
    DatePickerInput: {
      classNames: {
        label: classes.label,
        input: classes.input,
        wrapper: classes.wrapper,
      },
    },
    Switch: {
      classNames: {
        label: classes.label,
        input: classes.input,
      },
    },
    Notification: Notification.extend({
      classNames: {
        root: classes['notification-root'],
        title: classes['notification-title'],
        description: classes['notification-description'],
        icon: classes['notification-icon'],
      },
    }),
    Modal: Modal.extend({
      classNames: {
        title: classes['modal-title'],
        body: classes['modal-body'],
        overlay: classes['modal-overlay'],
        header: classes['modal-header'],
      },
    }),
    Group: Group.extend({
      defaultProps: {
        gap: 'sm',
      },
    }),

    Button: Button.extend({
      defaultProps: {
        loaderProps: {
          type: 'dots',
        },
      },
    }),

    Loader: Loader.extend({
      defaultProps: {
        type: 'dots',
      },
    }),
  },
});
