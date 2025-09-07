// components/Form/FileUploadField.tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Typography, Upload } from 'antd';
import { Controller, Control } from 'react-hook-form';

const { Text } = Typography;

type FileUploadFieldProps = {
  name: string;
  label: string;
  note: string;
  accept: string;
  required?: boolean;
  control: Control<any>;
};

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  name,
  label,
  note,
  accept,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const props = {
          accept,
          maxCount: 1,
          beforeUpload: (file: File) => {
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
              alert('File too large. Max size is 5MB.');
              return Upload.LIST_IGNORE;
            }
            field.onChange(file); // Store file in RHF
            return false; // Prevent auto upload
          },
          onRemove: () => {
            field.onChange(null); // Clear file
          },
          fileList: field.value ? [field.value] : [],
        };

        return (
          <div
            style={{
              border: '1px solid #eee',
              borderRadius: 10,
              padding: 16,
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Text strong>{label}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {note}
              </Text>
              {field.value && (
                <div style={{ marginTop: 8 }}>
                  <Text type="success">Uploaded</Text>{' '}
                  <Text underline>{field.value.name}</Text>
                </div>
              )}
            </div>
            <Upload {...props}>
              <Button>Browse</Button>
            </Upload>
          </div>
        );
      }}
    />
  );
};

export default FileUploadField;
