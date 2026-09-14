import 'package:flutter/material.dart';

import 'app_text_field.dart';

class AppTimeField extends StatefulWidget {
  const AppTimeField({
    super.key,
    required this.label,
    this.initialTime,
    this.helperText,
    this.onChanged,
  });

  final String label;
  final TimeOfDay? initialTime;

  final String? helperText;

  final ValueChanged<TimeOfDay?>? onChanged;

  @override
  State<AppTimeField> createState() => _AppTimeFieldState();
}

class _AppTimeFieldState extends State<AppTimeField> {
  late final TextEditingController _controller;

  TimeOfDay? _selectedTime;

  @override
  void initState() {
    super.initState();

    _selectedTime = widget.initialTime;
    _controller = TextEditingController();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    if (_selectedTime != null) {
      _controller.text =
          MaterialLocalizations.of(context).formatTimeOfDay(
        _selectedTime!,
      );
    }
  }

  Future<void> _selectTime() async {
    final time = await showTimePicker(
      context: context,
      initialTime:
          _selectedTime ?? TimeOfDay.now(),
    );

    if (time == null) {
      return;
    }

    setState(() {
      _selectedTime = time;

      _controller.text =
          MaterialLocalizations.of(context).formatTimeOfDay(
        time,
      );
    });

    widget.onChanged?.call(time);
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
      hintText: 'Selecciona una hora',
      helperText: widget.helperText,
      readOnly: true,
      onTap: _selectTime,
      suffixIcon: IconButton(
        tooltip: 'Seleccionar hora',
        onPressed: _selectTime,
        icon: const Icon(
          Icons.access_time_outlined,
        ),
      ),
    );
  }
}