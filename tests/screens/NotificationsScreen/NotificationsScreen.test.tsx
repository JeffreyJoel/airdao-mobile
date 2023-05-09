import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { Notifications } from '@screens/Notifications';
import { fireEvent, render } from '@testing-library/react-native';

jest.mock('victory-native', () => {
  return {
    VictoryChart: jest.fn(),
    VictoryTheme: {},
    VictoryLine: jest.fn(),
    VictoryAxis: jest.fn()
  };
});

// jest.mock('@models/Notification', () => ({
//   Notification: jest.fn()
// }));

const queryClient = new QueryClient();

const Component = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Notifications />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

describe('Notifications Screen', () => {
  it('renders correctly', async () => {
    const { getByTestId } = render(<Component />);
    expect(getByTestId('notifications-screen')).toBeTruthy();
  });

  // it('shows empty notification message when there are no notifications', () => {
  //   const { getByText } = render(<Component />);
  //   jest.spyOn(Notification, 'length', 'get').mockReturnValue(0);
  //   expect(
  //     getByText('You have no notifications right now. Come back later.')
  //   ).toBeTruthy();
  // });

  it('displays notification sections', () => {
    const { getByText } = render(<Component />);
    expect(getByText('TODAY')).toBeTruthy();
    expect(getByText('YESTERDAY')).toBeTruthy();
  });

  it('opens filter modal when filter button is pressed', async () => {
    const { getByTestId } = render(<Component />);
    const filterButton = getByTestId('filter-button');
    fireEvent.press(filterButton);
    await new Promise((res) => setTimeout(res, 500));
    expect(getByTestId('filter-modal')).toBeDefined();
  });

  it('opens settings modal when settings button is pressed', async () => {
    const { getByTestId } = render(<Component />);
    const filterButton = getByTestId('settings-button');
    fireEvent.press(filterButton);
    await new Promise((res) => setTimeout(res, 500));
    expect(getByTestId('settings-modal')).toBeDefined();
  });
});

// sectionlist
