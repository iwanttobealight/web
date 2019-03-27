import { ReactElement } from 'react'
import { OptionProps } from 'antd/lib/select'

export const filterOption = (
  inputValue: string,
  option: ReactElement<OptionProps>,
) => {
  if (option && option.props && option.props.children) {
    return `${option.props.children}`
      .toUpperCase()
      .includes(inputValue.toUpperCase())
  }

  return false
}
