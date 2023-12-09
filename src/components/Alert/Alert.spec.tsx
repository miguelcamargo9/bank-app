import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

const onClose = () => {
    return;
}

it('renders Alert component', () => {
    render(<Alert message='' onClose={onClose} type='success'/>);
});
