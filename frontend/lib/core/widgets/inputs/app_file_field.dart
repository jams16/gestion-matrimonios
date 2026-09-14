import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

class AppFileField extends StatefulWidget {
  const AppFileField({
    super.key,
    required this.label,
    this.helperText,
    this.allowedExtensions,
    this.onSelected,
  });

  final String label;
  final String? helperText;

  final List<String>? allowedExtensions;

  final ValueChanged<PlatformFile?>? onSelected;

  @override
  State<AppFileField> createState() => _AppFileFieldState();
}

class _AppFileFieldState extends State<AppFileField> {
  PlatformFile? _file;

  Future<void> _pickFile() async {
    final file = await FilePicker.pickFile(
      type: widget.allowedExtensions == null ? FileType.any : FileType.custom,
      allowedExtensions: widget.allowedExtensions,
    );

    if (file == null) {
      return;
    }

    setState(() {
      _file = file;
    });

    widget.onSelected?.call(file);
  }

  void _removeFile() {
    setState(() {
      _file = null;
    });

    widget.onSelected?.call(null);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: Theme.of(
            context,
          ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w500),
        ),

        const SizedBox(height: 7),

        InkWell(
          borderRadius: BorderRadius.circular(8),
          onTap: _pickFile,
          child: InputDecorator(
            decoration: InputDecoration(
              helperText: widget.helperText,
              prefixIcon: const Icon(Icons.attach_file),
              suffixIcon: _file == null
                  ? const Icon(Icons.upload_file_outlined)
                  : IconButton(
                      tooltip: 'Eliminar archivo',
                      onPressed: _removeFile,
                      icon: const Icon(Icons.close),
                    ),
            ),
            child: Text(
              _file?.name ?? 'Seleccionar archivo',
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ),
      ],
    );
  }
}
