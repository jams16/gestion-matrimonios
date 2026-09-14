import 'package:flutter/material.dart';

import 'app_text_field.dart';

class AppDateField extends StatefulWidget {
  const AppDateField({
    super.key,
    required this.label,
    this.initialDate,
    this.firstDate,
    this.lastDate,
    this.helperText,
    this.onChanged,
  });

  final String label;

  final DateTime? initialDate;
  final DateTime? firstDate;
  final DateTime? lastDate;

  final String? helperText;

  final ValueChanged<DateTime?>? onChanged;

  @override
  State<AppDateField> createState() => _AppDateFieldState();
}

class _AppDateFieldState extends State<AppDateField> {
  late final TextEditingController _controller;

  DateTime? _selectedDate;

  @override
  void initState() {
    super.initState();

    _selectedDate = widget.initialDate;

    _controller = TextEditingController(
      text: _selectedDate == null ? '' : _formatDate(_selectedDate!),
    );
  }

  String _formatDate(DateTime date) {
    final day = date.day.toString().padLeft(2, '0');
    final month = date.month.toString().padLeft(2, '0');

    return '$day/$month/${date.year}';
  }

  Future<void> _selectDate() async {
    final now = DateTime.now();

    final date = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? now,
      firstDate: widget.firstDate ?? DateTime(now.year - 10),
      lastDate: widget.lastDate ?? DateTime(now.year + 20),
    );

    if (date == null) {
      return;
    }

    setState(() {
      _selectedDate = date;
      _controller.text = _formatDate(date);
    });

    widget.onChanged?.call(date);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AppTextField(
      label: widget.label,
      controller: _controller,
      hintText: 'DD/MM/AAAA',
      helperText: widget.helperText,
      readOnly: true,
      onTap: _selectDate,
      suffixIcon: IconButton(
        tooltip: 'Seleccionar fecha',
        onPressed: _selectDate,
        icon: const Icon(Icons.calendar_today_outlined),
      ),
    );
  }
}
